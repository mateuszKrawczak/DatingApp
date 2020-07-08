namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        public int PageNumber { get; set; } = 1;
        public int MaxPageSize { get; set; } = 50;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}