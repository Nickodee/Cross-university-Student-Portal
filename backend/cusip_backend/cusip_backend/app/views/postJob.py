from rest_framework import generics
from rest_framework.views import APIView

from app.models import PostJob
from app.serializers import PostJobSerializer

class CreatePostJob(generics.CreateAPIView):
    queryset = PostJob.objects.all()
    serializer_class = PostJobSerializer

class RetrievePostJob(generics.RetrieveAPIView):
    queryset = PostJob.objects.all()
    serializer_class = PostJobSerializer