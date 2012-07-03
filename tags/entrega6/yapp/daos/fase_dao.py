from yapp.daos.base_dao import BaseDAO
from yapp.models.fase.fase import Fase

class FaseDAO(BaseDAO):
    def get_clase(self):
        return Fase
    
    
    def update_estado_entidad(self, entidad_id, estado):
        """
        Metodo que cambia el estado de una entidad al estado recibido como parametro
        - B{Parametros:} 
            - B{entidad_id:} id de la entidad a ser cambiada
            - B{estado:} estado a ser cambiado
        """
        fase = self.get_by_id(entidad_id)
        fase._estado = estado        
        self.update(fase)