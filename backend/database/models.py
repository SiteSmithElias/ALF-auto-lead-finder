from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from database.database import Base

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    address = Column(String)
    city = Column(String)
    country = Column(String)
    phone = Column(String)
    email = Column(String)
    website = Column(String)
    category = Column(String)
    created_at = Column(DateTime,default=datetime.utcnow)
    updated_at = Column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)

    sources = relationship("BusinessSource", back_populates="business")
    leads = relationship("Lead", back_populates="business")
    contacts = relationship("Contact", back_populates="business")

class BusinessSource(Base):
    __tablename__ = "business_sources"

    id = Column(Integer, primary_key=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    source_type = Column(String)
    external_id = Column(String, unique=True, nullable=True)
    url = Column(String)
    discovered_at = Column(DateTime, default=datetime.utcnow)
    business = relationship("Business", back_populates="sources")

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    status = Column(String)
    score = Column(Integer)
    score_reason = Column(String)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    business = relationship("Business", back_populates="leads")

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    role = Column(String)

    business = relationship("Business", back_populates="contacts")

class ExcludedBusiness(Base):
    __tablename__ = "excluded_businesses"

    id = Column(Integer, primary_key=True)
    source_type = Column(String)
    external_id = Column(String, unique=True)
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    company_name = Column(String)
    avatar_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)