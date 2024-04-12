package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Destinations;
import com.example.demo.entity.Image;
import com.example.demo.entity.ServiceEntity;
import com.example.demo.entity.Tour;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.DestinationsRepository;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.TourRepository;
import com.example.demo.request.CreateDestinationsRequest;
import com.example.demo.service.DestinationsService;

@Service
public class DestinationsServiceImpl implements DestinationsService{

	@Autowired
	private DestinationsRepository destinationsRepository;
	
	@Autowired
	private ImageRepository imageRepository;
	
	@Autowired
	private TourRepository TourRepository;

	
	@Override
	public List<Destinations> getListDestinations() {
		// TODO Auto-generated method stub
		return destinationsRepository.findAll(Sort.by("id").descending());
	}

	
	@Override
	public List<Destinations> getListDestinationsHot(){
		return destinationsRepository.getListDestinationsHot();
	}


	@Override
	public List<Destinations> findDestinationsByKeyword(String keyword) {
		// TODO Auto-generated method stub
		return destinationsRepository.findByKeyword(keyword);
	}
	
	
	@Override
	public Destinations createDestination(CreateDestinationsRequest body) {
		System.out.print("\ncreateDestinations(CreateDestinationsRequest body) {"+body.getName());
		Destinations destination = new Destinations();
		destination.setName(body.getName());
		destination.setDescribe(body.getDescribe());
		destination.setProvince(body.getProvince());	
		
	    List<Image> images = new ArrayList<>();
	    if (body.getImage() != null) {
	        for (long imageId : body.getImage()) {
	            Image image = imageRepository.findById(imageId)
	                    .orElseThrow(() -> new NotFoundException("Not Found Image With Id: " + imageId));
	            images.add(image);
	        }
	    }
		
		destination.setImage(images);	
		// TODO Auto-generated method stub
		destinationsRepository.save(destination);
		return destination;
	}


	@Override
	public List<Destinations> findDestinationsByName(String name) {
		// TODO Auto-generated method stub
		List<Destinations> destination = destinationsRepository.findByName(name);
		return destination;
	}



	@Override
	public Destinations updateDestination(CreateDestinationsRequest body, Long id) {
		Destinations destination = destinationsRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Image With Id: " + id));
		destination.setName(body.getName());
		destination.setDescribe(body.getDescribe());
		destination.setProvince(body.getProvince());	
		
	    List<Image> images = new ArrayList<>();
	    if (body.getImage() != null) {
	        for (long imageId : body.getImage()) {
	            Image image = imageRepository.findById(imageId)
	                    .orElseThrow(() -> new NotFoundException("Not Found Image With Id: " + imageId));
	            images.add(image);
	        }
	    }
		
		destination.setImage(images);	
		// TODO Auto-generated method stub
		destinationsRepository.save(destination);
		return destination;
	}


	@Override
	public void deleteDestination(Long id) {
		Destinations destination = destinationsRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Image With Id: " + id));
		List<Tour> Tours = TourRepository.findTourByIdDestinations(id);
		if(Tours != null && !Tours.isEmpty()) {
			for (Tour Tourss : Tours) {
				Tourss.setDestinations(null);
			}
			TourRepository.saveAll(Tours);
		}
		destination.getImage().remove(this);
		destinationsRepository.delete(destination);
	}


	@Override
	public Long count() {
		// TODO Auto-generated method stub
		return destinationsRepository.count();
	}
}
