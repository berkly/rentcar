package com.domru.rentcar;

import com.domru.rentcar.controllers.CarController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RentcarApplicationTests {

	@Autowired
    private CarController carController;

	@Test
	public void contextLoads() {
	    assertThat(carController).isNotNull();
	}

}
