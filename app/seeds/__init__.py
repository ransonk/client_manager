from flask.cli import AppGroup
from .users import seed_trainers, seed_clients, seed_history, seed_workouts, seed_workoutintensities, seed_workoutplans, seed_routinelist, seed_routine, undo_trainers
# from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_trainers()
    seed_clients()
    seed_history()
    seed_workouts()
    seed_workoutintensities()
    seed_workoutplans()
    seed_routinelist()
    seed_routine()
    # seed_users()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_trainers()
    # undo_clients()
    # undo_users()
    # Add other undo functions here
