using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }
         [HttpPost("addbook")]
        public IActionResult Addbook(BookModel bookModel)
        {
            try
            {
                string query = "INSERT INTO Books (title, author, imageUrl, pages) " +
                               "VALUES (@title, @author, @imageUrl, @pages)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@title", bookModel.title);
                    command.Parameters.AddWithValue("@author", bookModel.author);
                    command.Parameters.AddWithValue("@imageUrl", bookModel.imageUrl);
                    command.Parameters.AddWithValue("@pages", bookModel.pages);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("Added successfully");
                    else
                        return BadRequest("Failed to add ");
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpGet("getbooks")]
public IActionResult GetBookDetails()
{
    try
    {
        string query = "SELECT * FROM Books order by id desc";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            _connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            List<BookModel> books = new List<BookModel>();

            while (reader.Read())
            {
                BookModel book = new BookModel
                {
                    id = reader.GetInt32(reader.GetOrdinal("id")),
                    title = reader.GetString(reader.GetOrdinal("title")),
                    author = reader.GetString(reader.GetOrdinal("author")),
                    imageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                    pages = reader.GetInt32(reader.GetOrdinal("pages"))
                };

                books.Add(book);
            }

            _connection.Close();
            return Ok(new { Status = "Success", Result = books });
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the book details");
    }
}
[HttpDelete("deletebook/{id}")]
public IActionResult DeleteBook(int id)
{
    try
    {
        string query = "DELETE FROM Books WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@id", id);
            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
            {
                return Ok("Book deleted successfully");
            }
            else
            {
                return NotFound("Book not found");
            }
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while deleting book. Details: {ex.Message}");
    }
}
[HttpPut("updatebook/{id}")]
public IActionResult UpdateBook(int id, [FromBody] BookModel updatedData)
{
    try
    {
        string query = "UPDATE Books SET title = @title, author = @author, " +
                       "imageUrl = @imageUrl, pages = @pages " +
                       "WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@title", updatedData.title);
            command.Parameters.AddWithValue("@author", updatedData.author);
            command.Parameters.AddWithValue("@imageUrl", updatedData.imageUrl);
            command.Parameters.AddWithValue("@pages", updatedData.pages);
            command.Parameters.AddWithValue("@id", id);

            _connection.Open();
            int rowsAffected = command.ExecuteNonQuery();
            _connection.Close();

            if (rowsAffected > 0)
                return Ok("Book updated successfully");
            else
                return NotFound("Book not found");
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while updating the book details. Details: {ex.Message}");
    }
}

[HttpGet("getdetails/{id}")]
public IActionResult GetBookDetails(int id)
{
    try
    {
        string query = "SELECT * FROM Books WHERE id = @id";

        using (SqlCommand command = new SqlCommand(query, _connection))
        {
            command.Parameters.AddWithValue("@id", id);
            _connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.Read())
            {
                BookModel book = new BookModel
                {
                   id = reader.GetInt32(reader.GetOrdinal("id")),
                    title = reader.GetString(reader.GetOrdinal("title")),
                    author = reader.GetString(reader.GetOrdinal("author")),
                    imageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                    pages = reader.GetInt32(reader.GetOrdinal("pages"))
                };

                _connection.Close();
                return Ok(new { Status = "Success", Result = book });
            }
            else
            {
                _connection.Close();
                return NotFound("Book not found");
            }
        }
    }
    catch (SqlException ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while fetching the book details. Details: {ex.Message}");
    }
}



       

    }
}