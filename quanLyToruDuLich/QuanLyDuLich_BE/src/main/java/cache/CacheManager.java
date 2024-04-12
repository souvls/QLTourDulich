package cache;

import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

@Component
public class CacheManager {
    private final Cache<String, Object> cache;

    public CacheManager() {
        this.cache = Caffeine.newBuilder()
                .expireAfterWrite(1, TimeUnit.HOURS) // Thời gian tồn tại của mục trong cache
                .maximumSize(100) // Số lượng mục tối đa trong cache
                .build();
    }

    public void put(String key, Object value) {
        cache.put(key, value);
    }

    public String get(String key) {
        Object value = cache.getIfPresent(key);
        return (value != null) ? value.toString() : null;
    }

    //xóa một mục
    public void evict(String key) {
        cache.invalidate(key);
    }

    //xóa all cache
    public void evictAll() {
        cache.invalidateAll();
    }
}
