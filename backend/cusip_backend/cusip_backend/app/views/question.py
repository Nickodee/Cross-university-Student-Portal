from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from app.models import Question, Response
from app.serializers import QuestionSerializer, ResponseSerializer

class CreateQuestion(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class RetrieveQuestion(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class GetAllQuestionsView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class CreateResponse(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

class RetrieveResponse(generics.RetrieveAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

class GetAllResponsesView(generics.ListAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
