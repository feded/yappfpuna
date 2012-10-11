package py.una.pol.ia;

public class Crossword {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
//		BacktrackSearch b = new BacktrackSearch();
//		b.doIt();
//		
//		DynamicVariableOrdering b = new DynamicVariableOrdering();
//		b.doIt();
		
//		ForwardChecking b = new ForwardChecking();
//		b.doIt();
		Puzzle p = PuzzleLoader.cargar(Puzzle.puzzleB);
		ConflictDirectedBackjumping cdb = new ConflictDirectedBackjumping(p);
		cdb.doIt();
//	
	}
	
}