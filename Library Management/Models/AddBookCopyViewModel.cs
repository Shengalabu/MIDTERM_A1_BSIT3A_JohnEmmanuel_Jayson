namespace Library_Management.Models
{
    public class AddBookCopyViewModel
    {
        public Guid BookId { get; set; }
        public string? CoverImageUrl { get; set; }
        public string? Condition { get; set; }
        public string? Source { get; set; }
        public int NumberOfCopies { get; set; } = 1;
    }
}
