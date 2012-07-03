from sqlalchemy import Column, Binary, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class Archivo (Base, EntidadBase):
    __tablename__ = "archivo"
    _contenido = Column(Binary)
    _nombre = Column(String)
    def __init__(self, contenido, nombre):
        self._contenido = contenido;
        self._nombre = nombre;

class ArchivoDTO():
    def __init__(self, archivo):
        if (archivo == None):
            return
        self._id = archivo._id;
        self._nombre = archivo._nombre;