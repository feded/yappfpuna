#'''
#Created on Apr 20, 2012
#
#@author: arturo
#'''
#from sqlalchemy import Column, String
#from sqlalchemy.orm import relation, backref
#from sqlalchemy.schema import ForeignKey
#from sqlalchemy.types import Integer
#from yapp.models import Base
#from yapp.models.entidad_base import EntidadBase
#from yapp.models.roles.rol_estado import RolEstado
#
#class Suscripcion (Base, EntidadBase):
#    __tablename__ = "suscripcion"
#    _nombre = Column(String, nullable=False)
##    _estado_id = Column(Integer, ForeignKey('rol_estado._id'))
#    discriminator = Column('type', String(50))
#    __mapper_args__ = {'polymorphic_on': discriminator}
#    _esFinal= False
#    _estado = relation(RolEstado, backref=backref('rol'))
#    
#    def __init__(self, nombre, estado):
#        self._nombre = nombre;
#        self._estado = estado;
#        