# User Table
# id, email, username, password, first_name, last_name, bio, birth_date, profile_image, created_at, updated_at
# Post Table
#PostComment
#PostLike

from rest_framework import generics
from app.models import User
from rest_framework import status
from app.serializers import UserSerializer, UserLoginSerializer
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


class CreateUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class LoginUserView(APIView):

#     def post(self, request):
#         # request.data (email, password)
#         serializer = UserLoginSerializer(data=request.data)

#         if serializer.is_valid():
#             try:
#                 user = User.objects.get(email=serializer.validated_data["email"])
#                 userPassword = serializer.validated_data["password"]
#                 if userPassword:
#                     token = Token.objects.get_or_create(user=user)
#                     return Response({ "success": True, "token": token[0].key, 'user_id':user.pk, 'email': user.email })
#                 else:
#                     return Response({ "success": False, "message": "incorrect password" })

#             except ObjectDoesNotExist:
#                 return Response({ "success": False, "message": "user does not exist" })

class LoginUserView(APIView):

    def post(self, request):
        # request.data (email, password)
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data["email"])
                user_password = serializer.validated_data["password"]

                # Authenticate the user with the provided email and password
                authenticated_user = authenticate(email=user.email, password=user_password)

                if authenticated_user is not None:
                    token = Token.objects.get_or_create(user=authenticated_user)
                    return Response({ "success": True, "token": token[0].key, 'user_id': user.pk, 'email': user.email })
                else:
                    # Return a clear error message for authentication failure
                    return Response({ "success": False, "message": "Incorrect email or password" }, status=status.HTTP_401_UNAUTHORIZED)

            except ObjectDoesNotExist:
                return Response({ "success": False, "message": "User does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        return Response({ "success": False, "message": "Invalid input data" }, status=status.HTTP_400_BAD_REQUEST)
class RetrieveUser(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    
class GetAllUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUser(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({ "success": True, "message": "user updated" })
        else:
            print(serializer.errors)
            return Response({ "success": False, "message": "error updating user" })

class DestroyUser(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            if pk == request.user.id:
                self.perform_destroy(request.user)
                return Response({ "success": True, "message": "user deleted" })
            else:
                return Response({ "success": False, "message": "not enough permissions" })
        except ObjectDoesNotExist:
            return Response({ "success": False, "message": "user does not exist" })

class LogoutUser(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        user = request.user
        if user.is_authenticated:
            token, _ = Token.objects.get_or_create(user=user)
            token.delete()
            logout_message = "Successfully logged out."
            return Response({"message": logout_message})
        else:
            return Response({"message": "User not authenticated."})