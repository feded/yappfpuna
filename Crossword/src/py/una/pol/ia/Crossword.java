package py.una.pol.ia;

public class Crossword {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		Puzzle p = PuzzleLoader.cargar(Puzzle.puzzleB);
//		BacktrackSearch b = new BacktrackSearch();
//		b.doIt();
		//
		DynamicVariableOrdering b = new DynamicVariableOrdering(p);
		b.doIt();

		// ForwardChecking b = new ForwardChecking();
		// b.doIt();

		// ForwardChecking fc = new ForwardChecking(p);
		// fc.doIt();
		// ConflictDirectedBackjumping cdb = new ConflictDirectedBackjumping(p);
		// cdb.doIt();

		// AC3 ac3 = new AC3(p);
		// ac3.doIt();
		//
	}
}