package yuown.spring.derby;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@ImportResource("classpath:/security.xml")
public class SpringDerbyApplication extends WebMvcAutoConfigurationAdapter {

    public static void main(String[] args) {
        SpringApplication.run(SpringDerbyApplication.class, args);
    }
}
