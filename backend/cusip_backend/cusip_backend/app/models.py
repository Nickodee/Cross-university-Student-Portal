from django.db import models
from django.contrib.auth.models import AbstractUser
from app.manager import UserManager
from ckeditor.fields import RichTextField


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=16)
    bio = models.CharField(max_length=200, null=True, blank=True)
    course = models.CharField(max_length=84, null=True, blank=True)
    registration_number = models.CharField(max_length=16, null=True, unique=True)
    cv = models.FileField(upload_to='cv_pdfs/',null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    linkedin_profile = models.URLField(max_length=200, null=True, blank=True)
    region = models.CharField(max_length=100, null=True, blank=True)
    year_of_study = models.CharField(max_length=20, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)

    confirm_password = models.CharField(max_length=128, blank=True, null=True)
    

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

class Post(models.Model):
    title = models.CharField(max_length=80)
    description = models.CharField(max_length=164)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    content = RichTextField(null=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
 
class PostLike(models.Model):
    post = models.ForeignKey(Post, null=False, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("post", "user"), )

class PostComment(models.Model):
    comment_text = models.CharField(max_length=264)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=False, on_delete=models.CASCADE)

class UserFollow(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name="src_follow")
    follows = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name="dest_follow")

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    question_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

class Response(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    question = models.ForeignKey(Question, null=True, on_delete=models.CASCADE)

class PostJob(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=200)
    jobType = models.CharField(max_length = 80)
    description = models.CharField(max_length=600)