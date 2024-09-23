# To Do List Version 02

To Do List Version 02, Node.js ve MongoDB kullanarak geliştirilmiş basit bir görev yönetim uygulamasıdır. Kullanıcılar, görev ekleyebilir, tamamlayabilir ve görevlerini görüntüleyebilir. Uygulama, Docker ile MongoDB'yi çalıştırarak yerel bir ortamda kolayca kullanılabilir.

## Özellikler

- Görev ekleme
- Görev silme
- Görev tamamlama
- Görevlerin sürüklenip bırakılarak yeniden sıralanabilmesi
- MongoDB ile veri saklama
- Kullanıcı dostu arayüz

## Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB
- Docker (isteğe bağlı)

## Kurulum

### 1. Projeyi Klonlayın
    ```bash
    git clone https://github.com/sametbesni/To Do List Version 02.git
    cd my-todo-app
    ```

### 2. Gerekli Paketleri Yükleyin,
    ```bash
    npm install
    ```


### 3. MongoDB'yi Docker ile Başlatın
    ```bash
    docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo
    ```

### 4. Uygulamayı Başlatın
    ```bash
    npm start
    ```

Uygulama, `http://localhost:5000` adresinde çalışacaktır.

## Kullanım

Uygulama çalıştığında, tarayıcınızda `http://localhost:5000` adresine giderek görevlerinizi yönetebilirsiniz. Görev eklemek için metin kutusuna bir görev yazın ve "Ekle" butonuna tıklayın veya "Enter" tuşuna basın. Görevleri tamamlamak için üzerine tıklayın ve silmek için kapatma simgesine tıklayın. Görevleri sürükleyip bırakarak sıralarını değiştirebilirsiniz.

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## Katkıda Bulunanlar

- [Samet Besni](https://github.com/sametbesni) - Proje sahibi ve geliştirici