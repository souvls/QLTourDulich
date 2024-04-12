package com.example.demo.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.security.service.UserDetailsServiceImpl;


// xác thực các request dựa trên token JWT(xử lý tất cả các request trước khi chúng đến đích cuối cùng)
public class AuthTokenFilter extends OncePerRequestFilter  {

    @Autowired
    private JwtUtils jwtUtils;
  
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
  
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
  
    //xử lý logic xác thực trong mỗi request
    @Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
      try {
        String jwt = parseJwt(request);
        System.out.print("jwt từ angular  " + jwt + "   ");
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
        	
          String username = jwtUtils.getUserNameFromJwtToken(jwt);
  
          UserDetails userDetails = userDetailsService.loadUserByUsername(username);
          
          //biểu diễn thông tin xác thực khi người dùng sử dụng tên người dùng và mật khẩu để đăng nhập
          UsernamePasswordAuthenticationToken authentication = 
              new UsernamePasswordAuthenticationToken(userDetails,
                                                      null,
                                                      userDetails.getAuthorities());
          
          //thiết lập thông tin chi tiết của việc xác thực người dùng từ request
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
  
          //đặt thông tin xác thực authentication vào SecurityContextHolder để thông báo rằng request này đã được xác thực thành công
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      } catch (Exception e) {
        logger.error("Cannot set user authentication: {}", e);
      }
  
      //chuyển tiếp request đến Filter hoặc endpoint tiếp theo trong chuỗi xử lý.
      filterChain.doFilter(request, response);
    }
  
//    private String parseJwt(HttpServletRequest request) {
//      String jwt = jwtUtils.getJwtFromCookies(request);
//      return jwt;
//    }
//    
    private String parseJwt(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")){
            //System.out.print("Hello    authHeader e." + authHeader);
            return authHeader.substring(7, authHeader.length());
        }
        return authHeader;
      }
 
    
}