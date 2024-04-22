
from django.contrib import admin
from django.urls import path
from app.views.user import CreateUser, LoginUserView,RetrieveUser, UpdateUser,DestroyUser, LogoutUser,GetAllUsersView
from app.views.post import CommentPost, CreatePost, DestroyPost, FollowUser,GetAllPostsView, RetrievePost, RetrieveUserPosts, UpdatePost, LikePost
from app.views.chats import SendMessage, RetrieveMessage, GetAllMessagesView, UpdateMessage, DestroyMessage, RetrieveUserMessages
from app.views.model import get_recommendations
from app.views.question import CreateQuestion, RetrieveQuestion, GetAllQuestionsView, CreateResponse, RetrieveResponse, GetAllResponsesView


urlpatterns = [
    path('user/create', CreateUser.as_view()),
    path('user/login', LoginUserView.as_view()),
    path('user/logout', LogoutUser.as_view()),
    path('users/', GetAllUsersView.as_view()),
    path('user/<int:pk>', RetrieveUser.as_view()),
    path('user/update', UpdateUser.as_view()),
    path('user/delete/<int:pk>', DestroyUser.as_view()),

    path('posts/', RetrieveUserPosts.as_view()),
    path('allposts/', GetAllPostsView.as_view()),
    path('post/create/', CreatePost.as_view()),
    path('post/<int:pk>/', RetrievePost.as_view()),
    path('post/update/<int:pk>/', UpdatePost.as_view()),
    path('post/delete/<int:pk>/', DestroyPost.as_view()),

    path('post/like/<int:pk>/', LikePost.as_view()),


    path('post/comment/<int:pk>/', CommentPost.as_view()),
    path('post/comments/<int:pk>/', CommentPost.as_view()),

    path('message/send/', SendMessage.as_view()),
    path('message/<int:pk>/', RetrieveMessage.as_view()),
    path('messages/', GetAllMessagesView.as_view()),
    path('message/update/<int:pk>/', UpdateMessage.as_view()),
    path('message/delete/<int:pk>/', DestroyMessage.as_view()),
    path('user/messages/', RetrieveUserMessages.as_view()),

    path('api/get_recommendations/', get_recommendations),

    path('question/create/', CreateQuestion.as_view()),
    path('question/<int:pk>/', RetrieveQuestion.as_view()),
    path('questions/', GetAllQuestionsView.as_view()), 

    path('response/create/', CreateResponse.as_view()),
    path('response/<int:pk>/', RetrieveResponse.as_view()),
    path('responses/', GetAllResponsesView.as_view()), 
]
