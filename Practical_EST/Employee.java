import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private double salary;

}

// Getters and setters are handled by lombook that is used alongside JPS to handle constructors and object lifecycle
