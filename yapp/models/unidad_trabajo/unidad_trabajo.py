from sqlalchemy import Column, String
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase

class UnidadTrabajo (Base, EntidadBase):
    """
    @summary: Crea una Tabla Unidad_Trabajo.
    """
    __tablename__ = "unidad_trabajo"
    _nombre = Column(String, nullable = False)
    _etiqueta = Column(String, nullable = False)
    _descripcion = Column(String, nullable = False)
    _color = Column(String, nullable=False)
    


    def __init__(self, nombre, etiqueta, descripcion, color):
        self._nombre = nombre;
        self._etiqueta = etiqueta;
        self._descripcion = descripcion;
        self._color = color;