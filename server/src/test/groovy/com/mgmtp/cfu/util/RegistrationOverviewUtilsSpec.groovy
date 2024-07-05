package com.mgmtp.cfu.util

import com.mgmtp.cfu.dto.RegistrationOverviewDTO
import com.mgmtp.cfu.entity.Registration
import com.mgmtp.cfu.enums.RegistrationStatus
import com.mgmtp.cfu.repository.RegistrationRepository
import spock.lang.Specification
import com.mgmtp.cfu.mapper.RegistrationOverviewMapper
import spock.lang.Specification
import org.springframework.data.domain.Sort
import java.time.LocalDateTime
import java.time.LocalDate
import java.time.LocalDate
import java.time.LocalDateTime

class RegistrationOverviewUtilsSpec extends Specification {
    def registrationOverviewMapper = Mock(RegistrationOverviewMapper)

    def "test getRegistrationOverviewDTOS with page #page and registrations #registrations"() {
        given:
        List<Registration> myRegistrations = List.of(
                Registration.builder().id(1).registerDate(LocalDate.now()).build(),
                Registration.builder().id(1).registerDate(LocalDate.now()).build(),
                Registration.builder().id(1).registerDate(LocalDate.now()).build(),
                Registration.builder().id(1).registerDate(LocalDate.now()).build()

        )
        registrationOverviewMapper.toDTO(_) >> RegistrationOverviewDTO.builder().id(1).status(RegistrationStatus.APPROVED).registerDate(LocalDate.now()).startDate(LocalDate.now()).build()

        when:
        List<RegistrationOverviewDTO> result = RegistrationOverviewUtils.getRegistrationOverviewDTOS(1, myRegistrations, registrationOverviewMapper)

        then:
        result.size() == 4
    }


    def "Test getSortedRegistrations method"() {
        given:
        Long userId = 1L
        def registrationRepository = Mock(RegistrationRepository)
        def expectedRegistrations = [
                Registration.builder().id(2).lastUpdate(LocalDateTime.now().plusDays(2)).endDate(LocalDate.now()).startDate(LocalDate.now()).registerDate(LocalDate.now()).build(),
                Registration.builder().id(1).lastUpdate(LocalDateTime.now()).endDate(LocalDate.now()).startDate(LocalDate.now()).registerDate(LocalDate.now()).build()
        ]
        registrationRepository.getByUserId(_, _) >> expectedRegistrations
        when:
        def result = RegistrationOverviewUtils.getSortedRegistrations(userId, registrationRepository)
        then:
        result.size() == expectedRegistrations.size()

        result == expectedRegistrations
    }

}