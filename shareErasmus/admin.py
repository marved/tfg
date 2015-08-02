from django.contrib import admin

from models import Link
from models import Score
from models import University
from models import Subject
from models import Comment
from models import User

admin.site.register(Link)
admin.site.register(Score)
admin.site.register(University)
admin.site.register(Subject)
admin.site.register(Comment)
admin.site.register(User)