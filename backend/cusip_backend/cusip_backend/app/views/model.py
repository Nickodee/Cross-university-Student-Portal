from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import joblib
import pandas as pd
import os

# Get the base directory of the Django project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Define the path to the model
model_path = os.path.join(BASE_DIR, 'model', 'cusip.pkl')

# Load the saved model
cosine_sim = joblib.load(model_path)

# Load the dataset
df = pd.read_csv('C:\\Users\\user\\Downloads\\students.csv')

# Assuming df is your DataFrame
df['year'] = df['year'].apply(lambda x: float(x.split()[0]) if isinstance(x, str) else 0)

# Create a new column combining 'course', 'department', 'reaction', and 'year' for TF-IDF
df['profile_features'] = df['course'] + ' ' + df['department'] + ' ' + df['reaction'].astype(str) + ' ' + df['year'].astype(str)

@csrf_exempt
def get_recommendations(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_course = data.get('course', '').lower()
        user_department = data.get('department', '').lower()
        user_profile = f"{user_course} {user_department} 0.0 0"

        # Function to get recommendations
        def get_recommendations(user_profile, cosine_sim=cosine_sim):
            user_profile_lower = user_profile.lower()  # Convert user input to lowercase
            indices = df.index[df['profile_features'].str.lower() == user_profile_lower].tolist()
            if not indices:
                return pd.DataFrame()
            
            idx = indices[0]
            sim_scores = list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: (x[1], df['year'].iloc[x[0]]), reverse=True)[1:4]
            student_indices = [x[0] for x in sim_scores]
            return df.iloc[student_indices]

        recommendations = get_recommendations(user_profile)
        output_columns = ['name', 'university', 'course', 'department', 'profile_link', 'region']
        if not recommendations.empty:
            recommendations_data = recommendations[output_columns].to_dict(orient='records')
            return JsonResponse({'recommendations': recommendations_data})  # Return recommendations directly as JSON
        else:
            return JsonResponse({'error': 'No recommendations available for the given user profile.'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
