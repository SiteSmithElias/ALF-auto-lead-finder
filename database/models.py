from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

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
    address = Column(
        String
    )
    website = Column(
        String,
        unique=True,
        nullable=True
    )
    phone = Column(
        String
    )
    industry = Column(
        String
    )
    category = Column(
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
    source = Column(
        String,
        default="google_maps",
        nullable=False
    )
    external_id = Column(
        String,
        unique=True,
        index=True
    )
    reviews_count = Column(
        Integer
    )
    reviews_average = Column(
        Float
    )
    latitude = Column(
        Float
    )
    longitude = Column(
        Float
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )

    contacts = relationship(
    "Contact",
    back_populates="company"
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

    company = relationship(
    "Company",
    back_populates="contacts"
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
