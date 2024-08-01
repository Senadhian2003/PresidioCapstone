using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Models;
using CoffeeStoreManagementApp.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoffeeStoreManagementApp.Services;
using Microsoft.AspNetCore.Authorization;

namespace CoffeeStoreManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderServices _orderServices;

        public OrderController(IOrderServices orderServices)
        {
            _orderServices = orderServices;
        }

        //[Authorize(Roles = "Admin")]
        [HttpGet("GetAllOrders")]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetAllOrders()
        {
            try
            {
                var result = await _orderServices.ViewAllOrders();
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return Unauthorized(new ErrorModel(401, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }

        //[Authorize(Roles = "Admin,Manager,Barista")]
        [HttpGet("GetAllActiveOrders")]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetAllActiveOrders()
        {
            try
            {
                var result = await _orderServices.ViewAllActiveOrders();
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return Unauthorized(new ErrorModel(401, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }


        [HttpGet("GetMyOrders")]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetMyOrders(int userId)
        {
            try
            {
                var result = await _orderServices.ViewAllMyOrders(userId);
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return Unauthorized(new ErrorModel(401, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }

        [HttpGet("GetMyActiveOrders")]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetMyActiveOrders(int userId)
        {
            try
            {
                var result = await _orderServices.ViewMyActiveOrders(userId);
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return Unauthorized(new ErrorModel(401, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }

        [HttpPut("UpdateOrderDetails")]
        [ProducesResponseType(typeof(CartItem), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> UpdateOrderDetails(UpdateOrderDetailDTO updateOrderDetailDTO)
        {
            try
            {
                var result = await _orderServices.UpdateOrderDetail(updateOrderDetailDTO);
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return Unauthorized(new ErrorModel(401, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }



    }
}
