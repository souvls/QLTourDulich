package com.example.demo.repository;

import com.example.demo.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>{

	@Query(value = "DELETE FROM ticket t WHERE t.endDate < CURRENT_TIMESTAMP",nativeQuery = true) // Xóa các ticket có endDate nhỏ hơn thời gian hiện tại
    void deleteExpiredTickets();

    List<Ticket> findAllByUserId(long userId);

}
