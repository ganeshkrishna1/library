namespace Library.Models
{
    public class BookModel
    {
        public int id { get; set; }  // Assuming you want to keep an ID for the book
        public string title { get; set; }
        public string author { get; set; }
        public string imageUrl { get; set; }
        public int pages { get; set; }
    }
}
