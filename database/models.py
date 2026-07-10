from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from database.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    name = Column(
        String,
        nullable=False
    )
    website = Column(
        String,
        unique=True,
        nullable=False
    )
    industry = Column(
        String
    )
    description = Column(
        Text
    )
    country = Column(
        String
    )
    city = Column(
        String
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=False
    )
    name = Column(
        String
    )
    email = Column(
        String
    )
    phone = Column(
        String
    )

class LeadScore(Base):
    __tablename__ = "lead_scores"

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        primary_key=True
    )
    score = Column(
        Integer
    )
    reason = Column(
        Text
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )