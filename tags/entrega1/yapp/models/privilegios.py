from yapp.models import Base

from sqlalchemy import (
    Column,
    Integer,
    Text,
    )

'''
Created on Mar 30, 2012

@author: arturo
'''
class Privilegios(Base):
    """ The SQLAlchemy declarative model class for a Page object. """
    __tablename__ = 'privilegios'
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=True)
    data = Column(Text)

    def __init__(self, name, data):
        self.name = name
        self.data = data