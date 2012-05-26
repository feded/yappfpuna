from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Permisos (Base, EntidadBase):
    __tablename__ = "permisos"
    _nombre = Column(String, nullable = False)
    
    def __init__(self, nombre):
        self._nombre = nombre;
    