from yapp.daos.base_dao import BaseDAO
from yapp.models.proyecto.proyecto import Proyecto

class ProyectoDAO(BaseDAO):
    def get_clase(self):
        return Proyecto
    
    def update_estado_entidad(self, entidad_id, estado):
        """
        Metodo que cambia el estado de una entidad al estado recibido como parametro
        - B{Parametros:} 
            - B{entidad_id:} id de la entidad a ser cambiada
            - B{estado:} estado a ser cambiado
        """
        proy = self.get_by_id(entidad_id)
        proy._estado = estado        
        self.update(proy)