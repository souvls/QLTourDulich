package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.entity.ServiceEntity;
import com.example.demo.entity.Tour;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.ServiceRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.request.CreateServiceRequest;
import com.example.demo.service.ServiceService;

@Service
public class ServiceServiceImpl implements ServiceService {

	@Autowired
	private ServiceRepository serviceRepository;

	@Autowired
	private TourRepository TourRepository;

	@Override
	public List<ServiceEntity> getListService() {
		return serviceRepository.findAll(Sort.by("id").descending());
	}

	@Override
	public List<ServiceEntity> getAllServiceById(Long id) {
		// TODO Auto-generated method stub
		return serviceRepository.findAllById(id);
	}

	@Override
	public Optional<ServiceEntity> finById(long id) {
		Optional<ServiceEntity> OptionalServiceEntity = serviceRepository.findById(id);

		if (OptionalServiceEntity.isPresent()) {
			return OptionalServiceEntity;
		} else {
			return serviceRepository.findById(id);
		}
	}

	@Override
	public List<ServiceEntity> createService(CreateServiceRequest body) {
	    List<ServiceEntity> serviceList = new ArrayList<>();
	    
	    if (body.getIdTour() != null && !body.getIdTour().isEmpty()) {
	        for (Long IDTour : body.getIdTour()) {
	            ServiceEntity service = new ServiceEntity();
	            Tour tour = TourRepository.findById(IDTour)
	                    .orElseThrow(() -> new NotFoundException("Not Found tour With Id: " + IDTour));
	            service.setDescription(body.getDescription());
	            service.setName(body.getName());
	            service.setPrice(body.getPrice());
	            service.setTour(tour);
	            serviceList.add(service);
	        }
	    } else {
	        ServiceEntity service = new ServiceEntity();
	        service.setDescription(body.getDescription());
	        service.setName(body.getName());
	        service.setPrice(body.getPrice());
	        service.setTour(null);
	        serviceList.add(service);
	    }	    
	    // Lưu danh sách ServiceEntity vào cơ sở dữ liệu
	    serviceRepository.saveAll(serviceList);
	    return serviceList;
	}

	@Override
	public List<ServiceEntity> updateService(CreateServiceRequest body, Long id) {
		 List<ServiceEntity> serviceList = new ArrayList<>();
		    
		    if (body.getIdTour() != null && !body.getIdTour().isEmpty()) {
		        for (Long IDTour : body.getIdTour()) {
		            ServiceEntity service = serviceRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found tour service Id: " + id));
		            Tour tour = TourRepository.findById(IDTour)
		                    .orElseThrow(() -> new NotFoundException("Not Found tour With Id: " + IDTour));
		            service.setDescription(body.getDescription());
		            service.setName(body.getName());
		            service.setPrice(body.getPrice());
		            service.setTour(tour);
		            serviceList.add(service);
		        }
		    } else {
		        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found tour service Id: " + id));
		        service.setDescription(body.getDescription());
		        service.setName(body.getName());
		        service.setPrice(body.getPrice());
		        service.setTour(null);
		        serviceList.add(service);
		    }	    
		    // Lưu danh sách ServiceEntity vào cơ sở dữ liệu
		    serviceRepository.saveAll(serviceList);
		    return serviceList;
	}

	@Override
	public void deleteService(Long id) {
		ServiceEntity service = new ServiceEntity();
		service = finById(id).orElseThrow(() -> new NotFoundException("Not Found service With Id: " + id));
		serviceRepository.delete(service);
	}
}
