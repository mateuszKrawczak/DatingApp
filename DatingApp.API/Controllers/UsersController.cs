using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IDataRepository _usersRepo;
        private readonly IMapper _mapper;

        public UsersController(IDataRepository usersRepo, IMapper mapper) : base()
        {
            _usersRepo = usersRepo;
           _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _usersRepo.GetUsers();

             var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);    

            return Ok(usersToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _usersRepo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailsDto>(user);    

            return Ok(userToReturn);
        }
    }
}