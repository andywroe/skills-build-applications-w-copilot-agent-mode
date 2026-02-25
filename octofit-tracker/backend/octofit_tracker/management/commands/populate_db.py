from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import connection
from djongo import models

from octofit_tracker import models as app_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear all collections safely (delete one by one)
        for obj in app_models.Activity.objects.all():
            obj.delete()
        for obj in app_models.Leaderboard.objects.all():
            obj.delete()
        for obj in app_models.Workout.objects.all():
            obj.delete()
        for obj in User.objects.all():
            obj.delete()
        for obj in app_models.Team.objects.all():
            obj.delete()

        # Create Teams
        marvel = app_models.Team.objects.create(name='Marvel')
        dc = app_models.Team.objects.create(name='DC')

        # Create Users
        tony = User.objects.create_user(username='ironman', email='tony@stark.com', password='password', team=marvel)
        steve = User.objects.create_user(username='captainamerica', email='steve@rogers.com', password='password', team=marvel)
        bruce = User.objects.create_user(username='hulk', email='bruce@banner.com', password='password', team=marvel)
        clark = User.objects.create_user(username='superman', email='clark@kent.com', password='password', team=dc)
        brucew = User.objects.create_user(username='batman', email='bruce@wayne.com', password='password', team=dc)
        diana = User.objects.create_user(username='wonderwoman', email='diana@prince.com', password='password', team=dc)

        # Create Activities
        app_models.Activity.objects.create(user=tony, type='Run', duration=30, distance=5)
        app_models.Activity.objects.create(user=steve, type='Swim', duration=45, distance=2)
        app_models.Activity.objects.create(user=clark, type='Fly', duration=60, distance=100)

        # Create Workouts
        app_models.Workout.objects.create(name='Super Strength', description='Strength workout for superheroes')
        app_models.Workout.objects.create(name='Flight Training', description='Flight workout for superheroes')

        # Create Leaderboard
        app_models.Leaderboard.objects.create(user=tony, score=100)
        app_models.Leaderboard.objects.create(user=clark, score=120)
        app_models.Leaderboard.objects.create(user=steve, score=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
