using Microsoft.AspNetCore.Mvc;
using SHOP_BE.Data;
using SHOP_BE.Models;

namespace SHOP_BE.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Đặt hàng thành công"
            });
        }
    }
}