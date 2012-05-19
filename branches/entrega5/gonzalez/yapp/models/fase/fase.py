from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relation, backref
from sqlalchemy.schema import ForeignKey
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.proyecto.proyecto import Proyecto

class Fase (EntidadPadre):
    """
    @summary: Crea una Tabla Fase.  
    @param _nombre: nombre de la fase.
    @param _orden: orden de la fase dentro del proyecto.
    @param _comentario: algun comentario acerca de la fase.
    @param _estado: el estado actual de la fase.
    @param _color: el color de la fase.
    @param _proyecto: proyecto al cual pertenece la fase.
    """
    __tablename__ = "fase"
    _id = Column(Integer, ForeignKey('entidad_padre._id'), primary_key=True)
    _orden = Column(Integer, nullable=False)
    _comentario = Column(String, nullable=False)
    _estado = Column(String, nullable=False)
    _color = Column(String, nullable=False)
    _proyecto_id = Column(Integer, ForeignKey('proyecto._id'))
    _proyecto = relation(Proyecto, backref=backref('fase_proyecto'), primaryjoin=Proyecto._id==_proyecto_id)

    def __init__(self, nombre, proyecto, orden, comentario, estado, color):
        self._nombre = nombre;
        self._proyecto = proyecto;
        self._orden = orden;
        self._comentario = comentario;
        self._estado = estado;
        self._color = color;