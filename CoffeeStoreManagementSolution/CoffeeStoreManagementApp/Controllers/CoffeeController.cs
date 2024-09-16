using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoffeeStoreManagementApp.Services.Interfaces;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

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

                return NotFound(new ErrorModel(404, ele.Message));
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

                return NotFound(new ErrorModel(404, enfe.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPut("UpdateCoffeeDetails")]
        [ProducesResponseType(typeof(Coffee), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> UpdateCoffeeDetails(UpdateCoffeeDTO updateCoffeeDTO)
        {
            try
            {
                var result = await _coffeeServices.UpdateCoffeDetails(updateCoffeeDTO);
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return NotFound(new ErrorModel(404, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPost("addNewCoffee")]
        public async Task<ActionResult<Coffee>> addNewCoffee([FromForm] AddNewCoffeeDTO addNewCoffeeDTO)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject("Result"));
                // Log received DTO
                System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(addNewCoffeeDTO));
                
                var result = await _coffeeServices.addNewCoffee(addNewCoffeeDTO);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message));
            }
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("GetAllAddOns")]
        [ProducesResponseType(typeof(List<Coffee>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<User>> GetAllAddOns()
        {
            try
            {
                var result = await _coffeeServices.GetDetailsForAddingNewCoffee();
                return Ok(result);
            }
            catch (EmptyListException ele)
            {

                return NotFound(new ErrorModel(404, ele.Message));
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel(500, ex.Message)); ;
            }

        }

    }
}
