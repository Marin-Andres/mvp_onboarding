using Microsoft.AspNetCore.Mvc;
using mvp_onboarding.Server.Interfaces;
using mvp_onboarding.Server.Dtos;

namespace mvp_onboarding.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreMethods _storeMethods;

        public StoreController(IStoreMethods storeMethods)
        {
            _storeMethods = storeMethods;
        }

        // GET: api/Store
        [HttpGet]
        public async Task<ActionResult<StoreResponseDto>> GetStores(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortColumn = "Name",
            [FromQuery] string sortDirection = "asc")
        {
            var storeResponse = await _storeMethods.GetStores(pageNumber, pageSize, sortColumn, sortDirection);
            if (storeResponse.TotalCount < 1)
            {
                return NotFound();
            }
            else
            {
                return Ok(storeResponse);
            }
        }

        // GET: api/Store/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDto>> GetStore(int id)
        {
            var storeDto = await _storeMethods.GetStore(id);

            if (storeDto == null)
            {
                return NotFound();
            }

            return Ok(storeDto);
        }

        // POST: api/Store
        [HttpPost]
        public async Task<ActionResult<StoreDto>> AddStore([FromBody] StoreDto storeDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }
            if (storeDto.Id == 0)
            {
                return await _storeMethods.AddStore(storeDto);
            }
            else
            {
                return BadRequest("Unable to add new record with fixed Id.");
            }
        }

        //PUT: api/Store/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStore([FromRoute] int id, [FromBody] StoreUpdateDto storeDto)
        {
            if (id != storeDto.Id)
            {
                return BadRequest("Store Id mismatches payload");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.
                    SelectMany(v => v.Errors).
                    Select(e => e.ErrorMessage).ToList();
                return BadRequest(errors);
            }

            var store = await _storeMethods.UpdateStore(id, storeDto);

            if (store == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(store);
            }
        }

        //DELETE: api/Store/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStore(int id)
        {
            var storeDto = await _storeMethods.DeleteStore(id);
            if (storeDto == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(storeDto);
            }
        }
    }
}
