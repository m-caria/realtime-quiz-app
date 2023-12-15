using System.ComponentModel.DataAnnotations;

namespace MinimalAPI.Data.Entities;
public class EntityBase
{
    [Key]
    public Guid Id { get; set; }

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
    public DateTime CreatedAt { get; set; }

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
    public DateTime EditedAt { get; set; }
}
