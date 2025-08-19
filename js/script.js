// تنبيهات التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تحديث بيانات مؤشرات التلوث كل 5 ثوان
    updatePollutionData();
    setInterval(updatePollutionData, 5000);
    
    // تنشيط القائمة المتحركة على الأجهزة الصغيرة
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (burger) burger.classList.remove('toggle');
        });
    });
    
    // تأثيرات التمرير
    setupScrollAnimations();
    
    // تهيئة نموذج التواصل
    setupContactForm();
    
    // تهيئة الأسئلة الشائعة
    setupFAQAccordion();
});

// دالة لتحديث بيانات التلوث
function updatePollutionData() {
    // بيانات وهمية
    const pm25 = Math.floor(Math.random() * 150) + 20;
    const pm10 = Math.floor(Math.random() * 200) + 30;
    const no2 = Math.floor(Math.random() * 100) + 10;
    const o3 = Math.floor(Math.random() * 80) + 5;
    
    // تحديث القيم في الواجهة
    if (document.getElementById('pm25-value')) {
        document.getElementById('pm25-value').textContent = pm25;
    }
    if (document.getElementById('pm10-value')) {
        document.getElementById('pm10-value').textContent = pm10;
    }
    if (document.getElementById('no2-value')) {
        document.getElementById('no2-value').textContent = no2;
    }
    if (document.getElementById('o3-value')) {
        document.getElementById('o3-value').textContent = o3;
    }
    
    // تحديث الحالة واللون لكل مؤشر
    updatePollutionStatus('pm25', pm25);
    updatePollutionStatus('pm10', pm10);
    updatePollutionStatus('no2', no2);
    updatePollutionStatus('o3', o3);
}

// دالة لتحديث حالة مؤشر التلوث
function updatePollutionStatus(type, value) {
    const card = document.getElementById(`${type}-card`);
    const statusElement = document.getElementById(`${type}-status`);
    
    if (!card || !statusElement) return;
    
    let statusText = '';
    let statusColor = '';
    let textColor = 'black';
    
    if (type === 'pm25') {
        if (value <= 12) {
            statusText = 'ممتاز';
            statusColor = '#00e400';
        } else if (value <= 35.4) {
            statusText = 'جيد';
            statusColor = '#ffff00';
        } else if (value <= 55.4) {
            statusText = 'متوسط';
            statusColor = '#ff7e00';
            textColor = 'white';
        } else if (value <= 150.4) {
            statusText = 'غير صحي';
            statusColor = '#ff0000';
            textColor = 'white';
        } else if (value <= 250.4) {
            statusText = 'سيء جداً';
            statusColor = '#8f3f97';
            textColor = 'white';
        } else {
            statusText = 'خطير';
            statusColor = '#7e0023';
            textColor = 'white';
        }
    } else if (type === 'pm10') {
        if (value <= 54) {
            statusText = 'ممتاز';
            statusColor = '#00e400';
        } else if (value <= 154) {
            statusText = 'جيد';
            statusColor = '#ffff00';
        } else if (value <= 254) {
            statusText = 'متوسط';
            statusColor = '#ff7e00';
            textColor = 'white';
        } else if (value <= 354) {
            statusText = 'غير صحي';
            statusColor = '#ff0000';
            textColor = 'white';
        } else if (value <= 424) {
            statusText = 'سيء جداً';
            statusColor = '#8f3f97';
            textColor = 'white';
        } else {
            statusText = 'خطير';
            statusColor = '#7e0023';
            textColor = 'white';
        }
    } else if (type === 'no2') {
        if (value <= 53) {
            statusText = 'ممتاز';
            statusColor = '#00e400';
        } else if (value <= 100) {
            statusText = 'جيد';
            statusColor = '#ffff00';
        } else if (value <= 360) {
            statusText = 'متوسط';
            statusColor = '#ff7e00';
            textColor = 'white';
        } else if (value <= 649) {
            statusText = 'غير صحي';
            statusColor = '#ff0000';
            textColor = 'white';
        } else if (value <= 1249) {
            statusText = 'سيء جداً';
            statusColor = '#8f3f97';
            textColor = 'white';
        } else {
            statusText = 'خطير';
            statusColor = '#7e0023';
            textColor = 'white';
        }
    } else if (type === 'o3') {
        if (value <= 54) {
            statusText = 'ممتاز';
            statusColor = '#00e400';
        } else if (value <= 70) {
            statusText = 'جيد';
            statusColor = '#ffff00';
        } else if (value <= 85) {
            statusText = 'متوسط';
            statusColor = '#ff7e00';
            textColor = 'white';
        } else if (value <= 105) {
            statusText = 'غير صحي';
            statusColor = '#ff0000';
            textColor = 'white';
        } else if (value <= 200) {
            statusText = 'سيء جداً';
            statusColor = '#8f3f97';
            textColor = 'white';
        } else {
            statusText = 'خطير';
            statusColor = '#7e0023';
            textColor = 'white';
        }
    }
    
    statusElement.textContent = statusText;
    statusElement.style.backgroundColor = statusColor;
    statusElement.style.color = textColor;
    card.style.borderTop = `3px solid ${statusColor}`;
}

// دالة لإعداد تأثيرات التمرير
function setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('fade-in');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // تشغيل مرة أولى لتحميل العناصر المرئية
    handleScrollAnimation();
}

// دالة لإعداد نموذج التواصل
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (contactForm && thankYouMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا في الواقع سيتم إرسال البيانات إلى الخادم
            // لكننا سنحاكي ذلك فقط لعرض رسالة الشكر
            
            // حفظ البيانات محلياً (لأغراض العرض فقط)
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // حفظ في localStorage
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // عرض رسالة الشكر
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // يمكنك هنا إضافة كود لإرسال البيانات إلى الخادم إذا كان موجودًا
            // مثلاً باستخدام fetch API
        });
    }
}

// دالة لإعادة تعيين نموذج التواصل
function resetForm() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (contactForm && thankYouMessage) {
        contactForm.reset();
        contactForm.style.display = 'block';
        thankYouMessage.style.display = 'none';
    }
}

// دالة لإعداد الأسئلة الشائعة
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    });
}

// دالة لإنشاء خريطة الأحياء (يتم استدعاؤها من صفحة الخرائط)
function initNeighborhoodMap() {
    if (!document.getElementById('map')) return;
    
    const map = L.map('map').setView([24.7136, 46.6753], 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // بيانات وهمية للأحياء
    const neighborhoods = [
        {name: "الملز", coords: [24.6536, 46.7152], pm25: 45, pm10: 60, no2: 30, o3: 20},
        {name: "الشفا", coords: [24.6936, 46.6252], pm25: 65, pm10: 85, no2: 45, o3: 30},
        {name: "النخيل", coords: [24.7536, 46.6552], pm25: 35, pm10: 50, no2: 25, o3: 15},
        {name: "العليا", coords: [24.7136, 46.6753], pm25: 55, pm10: 70, no2: 35, o3: 25},
        {name: "اليرموك", coords: [24.6636, 46.6952], pm25: 75, pm10: 95, no2: 55, o3: 40},
        {name: "الرحمانية", coords: [24.7336, 46.7252], pm25: 40, pm10: 55, no2: 30, o3: 20},
        {name: "النسيم", coords: [24.6736, 46.7352], pm25: 85, pm10: 110, no2: 60, o3: 45},
        {name: "المربع", coords: [24.6436, 46.7052], pm25: 50, pm10: 65, no2: 40, o3: 30}
    ];
    
    // دالة لتحديد لون المؤشر حسب القيمة
    function getColorByValue(value, type) {
        let thresholds;
        if (type === 'pm25') {
            thresholds = [0, 12, 35.4, 55.4, 150.4, 250.4, 500.4];
        } else if (type === 'pm10') {
            thresholds = [0, 54, 154, 254, 354, 424, 604];
        } else if (type === 'no2') {
            thresholds = [0, 53, 100, 360, 649, 1249, 2049];
        } else if (type === 'o3') {
            thresholds = [0, 54, 70, 85, 105, 200, 404];
        } else { // overall
            thresholds = [0, 50, 100, 150, 200, 300, 500];
        }
        
        if (value <= thresholds[1]) return '#00e400'; // ممتاز
        if (value <= thresholds[2]) return '#ffff00'; // جيد
        if (value <= thresholds[3]) return '#ff7e00'; // متوسط
        if (value <= thresholds[4]) return '#ff0000'; // غير صحي
        if (value <= thresholds[5]) return '#8f3f97'; // سيء جداً
        return '#7e0023'; // خطير
    }
    
    // إضافة العلامات إلى الخريطة
    neighborhoods.forEach(neighborhood => {
        const overall = Math.round((neighborhood.pm25 + neighborhood.pm10 + neighborhood.no2 + neighborhood.o3) / 4);
        const marker = L.circleMarker(neighborhood.coords, {
            radius: 15,
            fillColor: getColorByValue(overall, 'overall'),
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`
            <h3>${neighborhood.name}</h3>
            <p><strong>PM2.5:</strong> ${neighborhood.pm25} µg/m³</p>
            <p><strong>PM10:</strong> ${neighborhood.pm10} µg/m³</p>
            <p><strong>NO2:</strong> ${neighborhood.no2} ppb</p>
            <p><strong>O3:</strong> ${neighborhood.o3} ppb</p>
            <p><strong>المؤشر العام:</strong> ${overall}</p>
        `);
    });
    
    // تحديث الخريطة عند تغيير المؤشر
    const pollutantType = document.getElementById('pollutant-type');
    if (pollutantType) {
        pollutantType.addEventListener('change', function() {
            const type = this.value;
            map.eachLayer(layer => {
                if (layer instanceof L.CircleMarker) {
                    const neighborhood = neighborhoods.find(n => 
                        n.coords[0] === layer.getLatLng().lat && 
                        n.coords[1] === layer.getLatLng().lng
                    );
                    
                    if (neighborhood) {
                        const value = type === 'overall' ? 
                            Math.round((neighborhood.pm25 + neighborhood.pm10 + neighborhood.no2 + neighborhood.o3) / 4) :
                            neighborhood[type];
                            
                        layer.setStyle({
                            fillColor: getColorByValue(value, type)
                        });
                        
                        // تحديث النافذة المنبثقة
                        const popupContent = `
                            <h3>${neighborhood.name}</h3>
                            <p><strong>PM2.5:</strong> ${neighborhood.pm25} µg/m³</p>
                            <p><strong>PM10:</strong> ${neighborhood.pm10} µg/m³</p>
                            <p><strong>NO2:</strong> ${neighborhood.no2} ppb</p>
                            <p><strong>O3:</strong> ${neighborhood.o3} ppb</p>
                            <p><strong>المؤشر العام:</strong> ${Math.round((neighborhood.pm25 + neighborhood.pm10 + neighborhood.no2 + neighborhood.o3) / 4)}</p>
                        `;
                        
                        if (layer.isPopupOpen()) {
                            layer.setPopupContent(popupContent);
                        }
                    }
                }
            });
        });
    }
    
    // عرض قائمة الأحياء
    const neighborhoodsList = document.getElementById('neighborhoods-list');
    if (neighborhoodsList) {
        neighborhoods.forEach(neighborhood => {
            const overall = Math.round((neighborhood.pm25 + neighborhood.pm10 + neighborhood.no2 + neighborhood.o3) / 4);
            const color = getColorByValue(overall, 'overall');
            
            const neighborhoodElement = document.createElement('div');
            neighborhoodElement.className = 'neighborhood-card';
            neighborhoodElement.style.borderLeft = `5px solid ${color}`;
            neighborhoodElement.innerHTML = `
                <h3>${neighborhood.name}</h3>
                <div class="neighborhood-info">
                    <div class="neighborhood-value">
                        <span>المؤشر العام</span>
                        <span class="value">${overall}</span>
                    </div>
                    <div class="neighborhood-details">
                        <p><strong>PM2.5:</strong> ${neighborhood.pm25} µg/m³</p>
                        <p><strong>PM10:</strong> ${neighborhood.pm10} µg/m³</p>
                    </div>
                </div>
                <button class="btn small" onclick="map.setView([${neighborhood.coords[0]}, ${neighborhood.coords[1]}], 13)">عرض على الخريطة</button>
            `;
            
            neighborhoodsList.appendChild(neighborhoodElement);
        });
    }
}

// استدعاء دالة الخريطة إذا كانت الصفحة تحتوي على خريطة
if (document.getElementById('map')) {
    initNeighborhoodMap();
}