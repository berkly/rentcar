package com.domru.rentcar.repository;

import com.domru.rentcar.domain.Car;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<Car, Long> {
    List<Car> findByBrand(@Param("brand") String brand);
    List<Car> findByColor(@Param("color") String color);

    /*List<Car> findByBrand(String brand);*/
    /*List<Car> findByColor(String color);*/
    List<Car> findByYear(Integer year);

    List<Car> findByBrandOrColor(String brand, String color);
    List<Car> findByBrandAndModel(String brand, String model);
    List<Car> findByBrandOrderByYearAsc(String brand);

    /*@Query("select c from Car c where c.brand = ?1")
    List<Car> findByBrand(String brand);*/

    @Query("select c from Car c where c.brand like %?1")
    List<Car> findByBrandEndsWith(String brand);


}
