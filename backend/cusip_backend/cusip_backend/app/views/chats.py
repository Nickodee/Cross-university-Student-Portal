from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app.models import User, Message
from app.serializers import MessageSerializer


class SendMessage(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class RetrieveMessage(generics.RetrieveAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class GetAllMessagesView(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class UpdateMessage(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def put(self, request, pk):
        message = Message.objects.get(id=pk)
        serializer = MessageSerializer(message, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response({"success": True, "message": "updated message"})
        else:
            print(serializer.errors)
            return Response({"success": False, "message": "error updating message"})


class DestroyMessage(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            pk = kwargs.get("pk")
            message = Message.objects.get(id=pk)
            if message.sender.id == request.user.id:
                self.perform_destroy(message)
                return Response({"success": True, "message": "message deleted"})
            else:
                return Response({"success": False, "message": "not enough permissions"})
        except ObjectDoesNotExist:
            return Response({"success": False, "message": "message does not exist"})


class RetrieveUserMessages(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user_messages = Message.objects.filter(receiver=request.user)
        serializer = self.serializer_class(user_messages, many=True)
        return Response({"success": True, "messages": serializer.data})
