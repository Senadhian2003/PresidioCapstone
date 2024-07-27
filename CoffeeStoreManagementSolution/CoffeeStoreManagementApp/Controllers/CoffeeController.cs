using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoffeeStoreManagementApp.Services.Interfaces;

namespace CoffeeStoreManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {

        private readonly ICoffeeServices _coffeeServices;

        public CoffeeController(ICoffeeServices coffeeServices)
        {
            _coffeeServices = coffeeServices;
        }


        [HttpGet("GetAllCoffees")]
        [ProducesResponseType(typeof(List<Coffee>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetAllCoffees()
        {
            try
            {
                var result = await _coffeeServices.GetAllCofffee();
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


        [HttpGet("GetCoffeeDetails")]
        [ProducesResponseType(typeof(List<Coffee>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetCoffeeById(int coffeeId)
        {
            try
            {
                var result = await _coffeeServices.GetCoffeeById(coffeeId);
                return Ok(result);
            }
            catch (ElementNotFoundException enfe)
            {

                return Unauthorized(new ErrorModel(401, enfe.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }


    }
}
