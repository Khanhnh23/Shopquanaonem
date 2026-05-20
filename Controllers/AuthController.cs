using Microsoft.AspNetCore.Mvc;
using SHOP_BE.Data;
using SHOP_BE.Models;
using SHOP_BE.Helpers;
using SHOP_BE.DTOs;

namespace SHOP_BE.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtHelper _jwt;

        public AuthController(AppDbContext context, JwtHelper jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            if (login == null)
                return BadRequest("Invalid request");

            var user = _context.Users
                .FirstOrDefault(x => x.Email == login.Email && x.Password == login.Password);

            if (user == null)
                return Unauthorized("Sai email hoặc mật khẩu");

            var token = _jwt.GenerateToken(user);

            return Ok(new
            {
                user.Id,
                user.Email,
                token
            });
        }

        // ================= REGISTER =================
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto model)
        {
            var exists = _context.Users.Any(x => x.Email == model.Email);

            if (exists)
                return BadRequest("Email đã tồn tại");

            var user = new User
            {
                Email = model.Email,
                Password = model.Password
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Đăng ký thành công"
            });
        }
    }
}