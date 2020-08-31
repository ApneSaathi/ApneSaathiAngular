import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

 getStates(){
      return Object.keys(this.Locations);
}

getDistricts(selectedState){
  return Object.keys(this.Locations[selectedState]);
}

getBlocks(selectedState,selectedDistrict){
  return this.Locations[selectedState][selectedDistrict];
}
  Locations={
    "Uttar Pradesh":{
        "Balrampur":[
          "Balrampur","Gaindaz Buzurg","Gaisadi","Pachperwa","Rehra Bazar","Shivpura",
          "Sriduttganj","Tulsipur","Utraula"
            ],
        "Behraich":[
          "Balha","Chittaura","Fakhar Pur ","Hujur Pur","Jarwal","Kaiser Ganj","Mahsi","Mihin Purva","Nagar Area","Nawab Ganj","Payagpur","Risia","Shiv Pur","Tajwa Pur","Visheshwar Ganj"
            ],
        "Chitrakoot":[
          "Karwi","Manikpur","Mau","Pahadi","Ramnagar"
          ],
        "Shrawasti":[
          "Gilaula","Gilaula","Hariharpur Rani","Ikauna","Jamunaha","Sirsiya"
          ],
        "Sonbhadra":[
          "Babhani","Chatra","Chopan","Duddhi","Ghorawal","Myorpur","Nagawa","Robertsganj"
          ],
        },

    "Assam":{
        "Baksa":[
          "Baska","Jalah","Tamulpur","Tihu Barama"
          ],
        "Barpeta":[
          "Bhawanipur","Chenga","Bajali","Rupshi","Mandia","Barpeta","Gobardhana"
          ],
        "Darrang":[
          "Dalgaon","Sipajhar","Kalaigaon"
          ],
        "Dhubri":[
          "Bilasipara","Chapor","Gauripur","Agomoni","Golakganj"
          ],
        "Goalpara":[
          "Balijana","Matia","Dudhnoi","Lakhipur"
          ],
        "Hailakandi":[
          "NA"
          ],
      },

    "Madhya Pradesh":{
        "Barwani":[
          "Raj Pur","Pansemal","Sendhwa","Niwali","Barwani","Pati","Thikri"
          ],
        "Damoh":[
          "Hatta","Tendukheda","Damoh","Patera","Jabera","Pathariya","Batiyagarh"
          ],
        "Khandwa":[
          "Chhegaounmakhan","Punasa","Khandwa","Khalwa","Pandhana","Harsud","Baladi"
          ],
        "Singrauli":[
         "Devsar","Waidhan","Chitrangi"
         ],
        "Vidisha":[
          "Gyaraspur","Sironj","Basoda","Vidisha","Nateran","Lateri","Kurwai"
        ],
      },
      
    "Bihar":{
        "Araria":[
          "Araria","Bhargama","Jokihat","Kursakanta","Palasi","Raniganj","Forbesganj","Narpatganj","Sikty"
        ],
        "Begusarai":[
          "Begusarai","Chaurahi","Khodawanpur","Cheriya Bariarpur","Bhagwanpur","Birpur","Barauni","Bachhwara","Matihani","Teghra","Teghra","Dandari","Samho","Sahebpur Kamal","Balia","Garhpura","Bakhari","Naokothi","Mansoorchak"
        ],
        "Sitamarhi":[
          "Bairgania","Bathnaha","Belsand","Majorganj","Parsauni","Riga","Suppi","Bajpatti","Bokhra","Choraut","Nanpur","Pupri","Sursand","Dumra","Runnisaidpur","Thumma","Sonbarsa","Parihar"
        ],
        "Katihar":[
          "Falka","Hasanganj","Korha","Mansahi","Pranpur","Amdabad","Barari","Manihari","Katihar","Dandkhora" ,"Kursela","Sameli","Azamnagar","Balrampur","Barsoi","Kadwa"
        ],
        "Sheikhpura":[
          "Sheikhpura","Ghat Kusumbha","Shekhopur Sarai","Barbigha","Chewara","Ariyari"
        ],
      },

    "Gujarat":{
          "Narmada":[
            "Nandod","Tilakwada","Garudeshwar","Dediyapada","Sagbara"
        ],
    },

    "Rajasthan":{
          "Baran":[
            "Baran","Kishanganj","Anta","Shahbad","Chhabra","Atru","Chhipabaroad"
          ],
          "Jaisalmer":[
            "Jaisalmer","Pokaran","Sam"
          ],
        },

    "Maharashtra":{
          "Amravati":[
            "Chikhaldhara",
          ],	
          "Gadchiroli":[
            "Gadchiroli",
          ],
          "Nandurbar":[
            "Dhadgaon","Taloda","Shahada","Nandurbar","Navapur","Akkalkuva"
          ],
        },

      "Jharkhand":{
          "Pakur":[
            "Amrapara","Hiranpur","Littipara","Pakur","Pakuria","Maheshpur","Amrapara ","Hiranpur"
            ],
          "Sahibganj":[
            "Barharwa","Berhait","Borio","Mandaro","Pathna","Rajmahal","Sahibganj","Taljhari","Udhwa"
          ],	
      },	

   }

  }

