from sqlalchemy import Column, String, Integer
from yapp.models import Base
from yapp.models.entidad_base import EntidadBase


class AtributoFase (Base, EntidadBase):

    __tablename__ = "atributofase"
    _fase_id = Column(Integer)
    _nombre = Column(String, nullable = False)

    def __init__(self, nombre, fase):
        self._nombre = nombre;
        self._fase_id = fase;