using System;
using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => DatetimeToAge.CalculateAge(src.DateOfBirth)));
            CreateMap<User, UserForDetailsDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => DatetimeToAge.CalculateAge(src.DateOfBirth))); 
            CreateMap<Photo, PhotosForDetailsDto>();

            CreateMap<UserForUpdatesDto, User>();

            CreateMap<UserForRegisterDto, User>();
        }


        
    }
    public static class DatetimeToAge{
        public static int CalculateAge(this DateTime date){
            var age = DateTime.Today.Year - date.Year;
            return age;
        }
    }
    
}