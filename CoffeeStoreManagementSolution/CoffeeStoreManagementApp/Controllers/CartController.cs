using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Services;
using CoffeeStoreManagementApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStoreManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {


        private readonly ICartServices _cartServices;

        public CartController(ICartServices cartServices)
        {
            _cartServices = cartServices;
        }

        //[Authorize(Roles = "User")]
        [HttpPost("AddCoffeeToCart")]
        [ProducesResponseType(typeof(CartItem), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> AddCoffeeToCart(AddItemToCartDTO addItemToCartDTO)
        {
            try
            {
                var result = await _cartServices.AddItemToCart(addItemToCartDTO);
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


        [HttpPut("UpdateCartItemQuantity")]
        [ProducesResponseType(typeof(CartItem), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> AddCofUpdateCartItemQuantityfeeToCart(UpdateCartItemDTO updateCartItemDTO)
        {
            try
            {
                var result = await _cartServices.UpdateCartItemQuantity(updateCartItemDTO);
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


        [HttpGet("GetCartItems")]
        [ProducesResponseType(typeof(List<CartItem>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetAllCoffees(int userId)
        {
            try
            {
                var result = await _cartServices.GetCartItems(userId);
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


        [HttpDelete("DeleteCartItem")]
        [ProducesResponseType(typeof(CartItem), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> DeleteCartItem(int cartItemId)
        {
            try
            {
                var result = await _cartServices.DeleteCartItem(cartItemId);
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


        [HttpPost("CheckoutCart")]
        [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> CheckoutCart(int userId)
        {
            try
            {
                var result = await _cartServices.CheckoutCart(userId);
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
