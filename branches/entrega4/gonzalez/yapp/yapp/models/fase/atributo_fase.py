from sqlalchemy import Column, String, Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase
from yapp.models.fase.fase import Fase
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relation, backref

class AtributoFase (Base, EntidadBase):
    """
    @summary: Crea un tabla Atributo_Fase. Los atributos particulares de una fase.
    @param _nombre: nombre del atributo particular de la fase.
    @param _descripcion: lo que guarda el atributo de la fase.
    @param _valor: contenido del atributo de la fase .
    @param fase: fase a la cual esta asociado el atributo.
    """

    __tablename__ = "atributo_fase"
    _nombre = Column(String, nullable = False)
    _descripcion = Column(String, nullable = False) #Ver si va a poder ser null
    _valor = Column(String, nullable = False)       #Ver si va a poder ser null
    _fase_id = Column(Integer, ForeignKey('fase._id'))
    _fase = relation(Fase, backref=backref('fase_atributo'))

    def __init__(self, nombre, fase, descripcion, valor):
        self._nombre = nombre;
        self._fase = fase;
        self._descripcion = descripcion;
        self._valor = valor;