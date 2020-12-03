"""empty message

Revision ID: 2e48c3acfff9
Revises: ffdc0a98111c
Create Date: 2020-12-02 19:10:30.023333

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2e48c3acfff9'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('trainers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=40), nullable=False),
    sa.Column('lastName', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('phone', sa.String(length=255), nullable=True),
    sa.Column('weight', sa.Integer(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('duedate', sa.String(length=255), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('paid', sa.Boolean(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('trainer_id', sa.Integer(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['trainer_id'], ['trainers.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workoutplans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('time', sa.Integer(), nullable=False),
    sa.Column('date', sa.Integer(), nullable=False),
    sa.Column('pull', sa.Boolean(), nullable=True),
    sa.Column('push', sa.Boolean(), nullable=True),
    sa.Column('noshows', sa.Integer(), nullable=True),
    sa.Column('cancellations', sa.Integer(), nullable=True),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workoutintensities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('sets', sa.Integer(), nullable=False),
    sa.Column('reps', sa.Integer(), nullable=False),
    sa.Column('workoutplan_id', sa.Integer(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['workoutplan_id'], ['workoutplans.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('workoutintensity_id', sa.Integer(), nullable=True),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['workoutintensity_id'], ['workoutintensities.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workouts')
    op.drop_table('workoutintensities')
    op.drop_table('workoutplans')
    op.drop_table('reviews')
    op.drop_table('clients')
    op.drop_table('trainers')
    # ### end Alembic commands ###