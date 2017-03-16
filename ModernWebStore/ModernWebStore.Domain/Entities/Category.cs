using ModernWebStore.Domain.Scopes;

namespace ModernWebStore.Domain.Entities
{
    public class Category
    {

        public int Id { get; private set; }
        public string Title { get; private set; }  
        
        public void Register()
        {
            if (!this.CreateCategoryScopeIsValid())
                return;
        }

        public void UpdateTitle(string title)
        {
            if (!this.EditCategoryScopeIsValid(title))
                return;

            this.Title = title;
        }
    }
}
