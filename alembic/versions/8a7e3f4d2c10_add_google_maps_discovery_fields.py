"""add google maps discovery fields

Revision ID: 8a7e3f4d2c10
Revises: f7246a9fbbd5
Create Date: 2026-07-12 17:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "8a7e3f4d2c10"
down_revision: Union[str, Sequence[str], None] = "f7246a9fbbd5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("companies", recreate="always") as batch_op:
        batch_op.add_column(sa.Column("address", sa.String(), nullable=True))
        batch_op.alter_column("website", existing_type=sa.String(), nullable=True)
        batch_op.add_column(sa.Column("phone", sa.String(), nullable=True))
        batch_op.add_column(sa.Column("category", sa.String(), nullable=True))
        batch_op.add_column(
            sa.Column(
                "source",
                sa.String(),
                nullable=False,
                server_default=sa.text("'google_maps'"),
            )
        )
        batch_op.add_column(sa.Column("external_id", sa.String(), nullable=True))
        batch_op.add_column(sa.Column("reviews_count", sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column("reviews_average", sa.Float(), nullable=True))
        batch_op.add_column(sa.Column("latitude", sa.Float(), nullable=True))
        batch_op.add_column(sa.Column("longitude", sa.Float(), nullable=True))
        batch_op.create_index(
            "ix_companies_external_id",
            ["external_id"],
            unique=True,
        )


def downgrade() -> None:
    with op.batch_alter_table("companies", recreate="always") as batch_op:
        batch_op.drop_index("ix_companies_external_id")
        batch_op.drop_column("longitude")
        batch_op.drop_column("latitude")
        batch_op.drop_column("reviews_average")
        batch_op.drop_column("reviews_count")
        batch_op.drop_column("external_id")
        batch_op.drop_column("source")
        batch_op.drop_column("category")
        batch_op.drop_column("phone")
        batch_op.drop_column("address")
        batch_op.alter_column("website", existing_type=sa.String(), nullable=False)
